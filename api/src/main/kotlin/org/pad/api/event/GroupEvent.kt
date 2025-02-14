package org.pad.api.event

import lombok.RequiredArgsConstructor
import lombok.extern.slf4j.Slf4j
import org.pad.api.domain.Group
import org.pad.api.repository.ChatRepository
import org.springframework.data.rest.core.annotation.HandleBeforeDelete
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.stereotype.Service

@Slf4j
@Service
@RepositoryEventHandler
@RequiredArgsConstructor
class GroupEvent(private val chatRepository: ChatRepository) {

    @HandleBeforeDelete
    fun handleBeforeDelete(group: Group) {
        val chats = chatRepository.findByGroupOrderByCreatedDateDesc(group)
        chatRepository.deleteAll(chats)
    }
}
