package springboot.backend.fitness.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.backend.fitness.model.Users;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByName(String name);
    boolean existsByEmail(String email);
    Optional<Users> findByEmail(String email);
}
