package org.pad.api.service

import org.pad.api.domain.Chat
import org.pad.api.domain.auth.User
import org.pad.api.domain.dto.ChatDto
import org.pad.api.repository.ChatRepository
import org.pad.api.repository.GroupRepository
import org.pad.api.service.auth.UserContext
import org.springframework.stereotype.Service
import java.util.*

@Service
class ChatService(
    private val chatRepository: ChatRepository,
    private val userContext: UserContext,
    private val groupRepository: GroupRepository,
    private val webSocketService: WebSocketService
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
            webSocketService.notifyUser(member, "/private/chat", chat.toJson())
        }
        return chatRepository.save(chat)
    }

    fun getGroupChats(group: UUID): List<Chat> {
        return chatRepository.findByGroupOrderByCreatedDateDesc(groupRepository.findById(group).orElseThrow())
    }
}
