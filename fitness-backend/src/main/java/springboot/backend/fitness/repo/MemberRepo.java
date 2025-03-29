package springboot.backend.fitness.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot.backend.fitness.model.Member;

import java.util.Optional;

public interface MemberRepo extends JpaRepository<Member, Long> {
    void deleteMemberById(Long id);

    Optional<Member> findMemberById(Long id);
}
