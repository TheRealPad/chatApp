package org.pad.api.service

import jakarta.transaction.Transactional
import org.pad.api.domain.auth.User
import org.pad.api.domain.dto.IsTypingDto
import org.pad.api.repository.GroupRepository
import org.pad.api.repository.auth.UserRepository
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.SimpMessageType
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service
import java.util.*

@Service
class WebSocketService(
    private val messagingTemplate: SimpMessagingTemplate,
    private val userRepository: UserRepository,
    private val groupRepository: GroupRepository,
) {

    private val connectedUsers = mutableSetOf<User>()
    private val userToSessionMap = mutableMapOf<String, String>()

    fun getConnectedUsers(): Set<User> {
        return connectedUsers
    }

    fun connect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        val u = userRepository.findById(UUID.fromString(user.trim('"')))
        if (u.isEmpty) {
            return connectedUsers
        }
        connectedUsers.add(u.get())
        userToSessionMap[u.get().uuid.toString()] = sessionId
        notifyUser(u.get(), "/queue/private", "Welcome ${u.get().username}!")
        return connectedUsers
    }

    fun notifyUser(user: User, destination: String, payload: String) {
        val headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE)
        headerAccessor.sessionId = userToSessionMap[user.uuid.toString()]
        headerAccessor.setLeaveMutable(true)
        messagingTemplate.convertAndSendToUser(userToSessionMap[user.uuid.toString()].toString(), destination, payload, headerAccessor.messageHeaders)
    }

    fun disconnect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        val removedUser = connectedUsers.find { it.uuid.equals(UUID.fromString(user.trim('"'))) }
        connectedUsers.remove(removedUser)
        userToSessionMap.remove(removedUser?.uuid.toString())
        return connectedUsers
    }

    @Transactional
    fun notifyTyping(request: IsTypingDto) {
        val group = groupRepository.findById(UUID.fromString(request.group))
        val groupMembers = group.get().members
        for (groupMember in groupMembers) {
            if (groupMember.uuid.toString() != request.user) {
                notifyUser(groupMember, "/queue/private/isTyping", request.toJson())
            }
        }
    }
}
