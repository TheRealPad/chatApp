package org.pad.api.controller

import org.pad.api.domain.auth.User
import org.pad.api.repository.auth.UserRepository
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.SimpMessageType
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.stereotype.Controller
import java.util.*


@Controller
class WebSocketController(private val userRepository: UserRepository, private val messagingTemplate: SimpMessagingTemplate) {

    private val connectedUsers = mutableSetOf<User>()
    private val userToSessionMap = mutableMapOf<User, String>()

    @SubscribeMapping("/topic/users")
    fun getConnectedUsers(): Set<User> {
        return connectedUsers
    }

    @MessageMapping("/connect")
    @SendTo("/topic/users")
    fun connect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        val u = userRepository.findById(UUID.fromString(user.trim('"')))
        if (u.isEmpty) {
            return connectedUsers
        }
        connectedUsers.add(u.get())
        userToSessionMap[u.get()] = sessionId
        notifyUserConnected(u.get())
        return connectedUsers
    }

    private fun notifyUserConnected(user: User) {
        val headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE)
        headerAccessor.sessionId = userToSessionMap[user]
        headerAccessor.setLeaveMutable(true)
        messagingTemplate.convertAndSendToUser(userToSessionMap[user].toString(), "/queue/private", "Welcome ${user.username}!", headerAccessor.messageHeaders)
    }

    @MessageMapping("/disconnect")
    @SendTo("/topic/users")
    fun disconnect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        val removedUser = connectedUsers.find { it.uuid.equals(UUID.fromString(user.trim('"'))) }
        connectedUsers.remove(removedUser)
        userToSessionMap.remove(removedUser)
        return connectedUsers
    }

}
