package org.pad.api.service

import org.pad.api.domain.auth.User
import org.pad.api.repository.auth.UserRepository
import org.pad.api.service.auth.UserContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@Service
class UserService(
    private val userContext: UserContext,
    private val userRepository: UserRepository,
    private val webSocketService: WebSocketService
) {

    fun addFriend(id: UUID): MutableList<User> {
        val user = userContext.getCurrentUser() ?: return mutableListOf()
        val friend = userRepository.findById(id)
        if (friend.isEmpty) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist")
        }
        if (user.friends.contains(friend.get()) || friend.get().friends.contains(friend.get())) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Users already friends")
        }
        user.friends.add(friend.get())
        friend.get().friends.add(user);
        userRepository.save(user)
        userRepository.save(friend.get())
        webSocketService.notifyUser(friend.get(), "/queue/subscribe", user.toJson())
        return user.friends
    }

    fun removeFriend(id: UUID): MutableList<User> {
        val user = userContext.getCurrentUser() ?: return mutableListOf()
        val friend = userRepository.findById(id)
        if (friend.isEmpty) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist")
        }
        if (!user.friends.contains(friend.get())) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN, "Users not friends")
        }
        user.friends.remove(friend.get())
        friend.get().friends.remove(user)
        userRepository.save(user)
        userRepository.save(friend.get())
        webSocketService.notifyUser(friend.get(), "/queue/unsubscribe", user.toJson())
        return user.friends
    }
}
