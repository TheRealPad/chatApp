package org.pad.api.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class ChatController {

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
}
