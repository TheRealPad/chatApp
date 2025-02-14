package org.pad.api.repository

import org.pad.api.domain.Chat
import org.pad.api.domain.Group
import org.pad.api.domain.auth.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface GroupRepository : JpaRepository<Group, UUID> {

    @Query("SELECT g FROM Group g JOIN g.members m WHERE m = :user")
    fun findByUser(@Param("user") user: User): List<Group>

    @Query(
        "SELECT g FROM Group g " +
                "WHERE g.isPersonal = true " +
                "AND SIZE(g.members) = 2 " +
                "AND :user1 MEMBER OF g.members " +
                "AND :user2 MEMBER OF g.members"
    )
    fun findPersonalGroupWithTwoMembers(
        @Param("user1") user1: User,
        @Param("user2") user2: User
    ): Optional<Group>

}
