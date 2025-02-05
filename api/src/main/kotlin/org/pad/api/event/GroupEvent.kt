package org.pad.api.event

import lombok.RequiredArgsConstructor
import lombok.extern.slf4j.Slf4j
import org.pad.api.domain.Group
import org.springframework.data.rest.core.annotation.HandleAfterCreate
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.stereotype.Service

@Slf4j
@Service
@RepositoryEventHandler
@RequiredArgsConstructor
class GroupEvent {

    @HandleBeforeCreate
    fun handleBeforeCreate(group: Group) {
        println("Handle Before Create")
    }

    @HandleAfterCreate
    fun handleAfterCreate(group: Group) {
        println("Handle After Create")
    }
}
