package org.pad.api.service

import org.pad.api.domain.Chat
import org.pad.api.domain.Group
import org.pad.api.domain.auth.User
import org.pad.api.domain.dto.ChatDto
import org.pad.api.repository.ChatRepository
import org.pad.api.repository.GroupRepository
import org.pad.api.repository.auth.UserRepository
import org.pad.api.service.auth.UserContext
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
class ChatService(
    private val chatRepository: ChatRepository,
    private val userContext: UserContext,
    private val groupRepository: GroupRepository,
    private val webSocketService: WebSocketService,
    private val userRepository: UserRepository
) {

    fun createChat(chatDto: ChatDto): Chat? {
        val user = userContext.getCurrentUser()
        val chat = Chat()
        if (chatDto.parentId != null) {
            chat.parent = chatRepository.findById(UUID.fromString(chatDto.parentId)).orElse(null)
        }
        chat.content = chatDto.content
        chat.group = groupRepository.findById(UUID.fromString(chatDto.groupId)).orElseThrow()
        chat.sender = user
        val group = chat.group
        for (member in group?.members.orEmpty()) {
            webSocketService.notifyUser(member, "/queue/private/chat", chat.toJson())
        }
        return chatRepository.save(chat)
    }

    fun getNumberUnseenUnseenChats(group: Group): Long {
        val user = userContext.getCurrentUser()
        val lastTimeGetDiscussion = group.lastSeen[user.uuid.toString()]
        val totalUnseen = if (lastTimeGetDiscussion == null) {
            chatRepository.countChatsInGroup(group.uuid)
        } else {
            chatRepository.countChatsAfterDate(group.uuid, lastTimeGetDiscussion, user)
        }
        return totalUnseen
    }

    fun markMessageAsSeen(group: Group, user: User) {
        group.lastSeen[user.uuid.toString()] = Date.from(Instant.now())
        groupRepository.save(group)
    }

    fun markMessageAsRead(userId: UUID, groupId: UUID) {
        val user = userRepository.findById(userId).orElseThrow()
        val group = groupRepository.findById(groupId).orElseThrow()

        markMessageAsSeen(group, user)
    }

    fun getGroupChats(group: UUID, markAsRead: Boolean): List<Chat> {
        if (markAsRead) {
            val user = userContext.getCurrentUser()
            val dbGroup = groupRepository.findById(group).orElseThrow()
            markMessageAsSeen(dbGroup, user)
        }
        return chatRepository.findByGroupOrderByCreatedDateDesc(groupRepository.findById(group).orElseThrow())
    }
}
