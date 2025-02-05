package org.pad.api.controller

import org.pad.api.domain.auth.User
import org.pad.api.repository.auth.UserRepository
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.stereotype.Controller
import java.util.*

@Controller
class WebSocketController(private val userRepository: UserRepository) {

    private val connectedUsers = mutableSetOf<User>()

    @SubscribeMapping("/topic/users")
    fun getConnectedUsers(): Set<User> {
        return connectedUsers
    }

    @MessageMapping("/connect")
    @SendTo("/topic/users")
    fun connect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        println(userRepository.findById(UUID.fromString(user.trim('"'))).get())
        val u = userRepository.findById(UUID.fromString(user.trim('"')))
        if (u.isEmpty) {
            return connectedUsers
        }
        connectedUsers.add(u.get())
        return connectedUsers
    }

    @MessageMapping("/disconnect")
    @SendTo("/topic/users")
    fun disconnect(user: String, headerAccessor: SimpMessageHeaderAccessor): Set<User> {
        val sessionId = headerAccessor.sessionId ?: return connectedUsers
        connectedUsers.remove(connectedUsers.find { it.uuid.equals(UUID.fromString(user.trim('"'))) })
        return connectedUsers
    }

}
