package springboot.backend.fitness.service;

import springboot.backend.fitness.dto.SignupRequest;
import springboot.backend.fitness.model.Users;

public interface AuthService {
    Users createUser(SignupRequest signupRequest);
}
