package springboot.backend.fitness.service;

import springboot.backend.fitness.dto.SignupRequest;
import springboot.backend.fitness.model.Users;
import springboot.backend.fitness.repo.UserRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepo userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public Users createUser(SignupRequest signupRequest) {
        //Check if user already exist
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return null;
        }

        Users users = new Users();
        BeanUtils.copyProperties(signupRequest,users);

        //Hash the password before saving
        String hashPassword = passwordEncoder.encode(signupRequest.getPassword());
        users.setPassword(hashPassword);
        Users createdUser = userRepository.save(users);
        users.setId(createdUser.getId());
        return users;
    }
}
