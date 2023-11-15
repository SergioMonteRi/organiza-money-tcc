package com.organizaMoney.service.user.application;

import com.organizaMoney.service.role.Role;
import com.organizaMoney.service.user.domain.User;
import com.organizaMoney.service.user.infra.UserDto;
import com.organizaMoney.service.user.infra.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServices implements UserDetailsService {
    private static Logger logger = LoggerFactory.getLogger(UserServices.class);
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    public UserServices(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            logger.error("User not found " + username);
            throw new UsernameNotFoundException("Email not found");
        }
        logger.info("User found " + username);
        return user;
    }
    @Transactional
    public UserDto save(UserDto userDTO) {
        User user = new User();
        user.setEmail(userDTO.email());
        user.getRoles().add(new Role(1L,"ROLE_USER"));
        user.setFirstName(userDTO.firstName());
        user.setLastName(userDTO.lastName());
        user.setPassword(passwordEncoder.encode(userDTO.password()));
        User loadedUser = userRepository.save(user);
        return new UserDto(
                loadedUser.getId(),
                loadedUser.getFirstName(),
                loadedUser.getLastName(),
                loadedUser.getEmail(),
                null);
    }
    public String getUserAuthenticatedEmail(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
    public User getLoggedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.userRepository.findByEmail(authentication.getName());
    }
}
