package org.pad.api.controller

import org.pad.api.domain.Chat
import org.pad.api.domain.dto.ChatDto
import org.pad.api.service.ChatService
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.util.*

@Controller
class ChatController(private val chatService: ChatService) {

    data class ChatMessage(
        val sender: String,
        val content: String,
        val timestamp: Long
    )

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    fun sendMessage(message: ChatMessage): ChatMessage {
        // Add timestamp to the message before broadcasting
        return message.copy(timestamp = System.currentTimeMillis())
    }

    @PostMapping("/postChat")
    @ResponseBody
    fun postMessage(@RequestBody body: ChatDto): Chat? {
        return chatService.createChat(body)
    }

    @GetMapping("/groupChat/{groupId}")
    @ResponseBody
    fun getGroupChat(@PathVariable groupId: String): List<Chat> {
        return chatService.getGroupChats(UUID.fromString(groupId), true)
    }
}
