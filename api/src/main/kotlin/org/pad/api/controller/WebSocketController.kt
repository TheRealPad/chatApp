package org.pad.api.controller

import org.springframework.context.event.EventListener
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.messaging.simp.broker.SimpleBrokerMessageHandler
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.messaging.support.GenericMessage
import org.springframework.stereotype.Controller
import org.springframework.web.socket.messaging.SessionDisconnectEvent

@Controller
class WebSocketController {

    private val connectedUsers = mutableSetOf<String>()

    @SubscribeMapping("/topic/users")
    fun getConnectedUsers(): Set<String> {
        return connectedUsers
    }

    @MessageMapping("/connect")
    @SendTo("/topic/users")
    fun connect(username: String, headerAccessor: SimpMessageHeaderAccessor): Set<String> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        connectedUsers.add("$username-$sessionId")
        return connectedUsers
    }

    @MessageMapping("/disconnect")
    @SendTo("/topic/users")
    fun disconnect(username: String, headerAccessor: SimpMessageHeaderAccessor): Set<String> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        connectedUsers.remove(connectedUsers.find { it.endsWith(sessionId) })
        return connectedUsers
    }

}
