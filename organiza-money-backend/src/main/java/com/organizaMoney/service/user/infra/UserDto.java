package com.organizaMoney.service.user.infra;

import org.codehaus.jackson.annotate.JsonIgnore;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public record UserDto(Long id,
                      @NotNull
                      String firstName,
                      @NotNull
                      String lastName,
                      @Email
                      String email,
                      @JsonIgnore
                      String password) {
    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
