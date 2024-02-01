package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.UserCredentialsRequestDTO;
import com.asj.suppliersApp.dto.request.UserRequestDTO;
import com.asj.suppliersApp.dto.response.UserResponseDTO;
import com.asj.suppliersApp.dto.response.UserValidationResponseDTO;
import com.asj.suppliersApp.entities.User;
import com.asj.suppliersApp.entities.UserRol;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.mappers.UserMapper;
import com.asj.suppliersApp.repositories.UserRepository;
import com.asj.suppliersApp.repositories.UserRolRepository;
import com.asj.suppliersApp.services.UsersService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UsersServiceImp implements UsersService {
    private final UserRepository userRep;
    private final UserRolRepository rolRep;

    public UsersServiceImp(UserRepository userRep, UserRolRepository rolRep) {
        this.userRep = userRep;
        this.rolRep = rolRep;
    }

    @Override
    public UserResponseDTO createUser(UserRequestDTO request) throws ResourceNotFoundException {
        User user = UserMapper.getUserFromRequest(request);
        if (request.getRolId() == null) user.setRol(this.getUserRolIfExits(2));
        else user.setRol(this.getUserRolIfExits(request.getRolId()));
        user.setAvailable(true);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user = userRep.save(user);
        return UserMapper.getUserResponse(user);
    }

    @Override
    public UserValidationResponseDTO validateUser(UserCredentialsRequestDTO request) {
        Optional<User> optUser = this.userRep.findByUsernameAndPasswordHash(request.getUsername(), request.getPasswordHash());
        if (optUser.isEmpty()) {
            return new UserValidationResponseDTO(false);
        }
        return new UserValidationResponseDTO(true);
    }

    @Override
    public UserResponseDTO loginUser(UserCredentialsRequestDTO request) throws ResourceNotFoundException {
        return UserMapper.getUserResponse(this.getUserIfExiste(request));
    }

    @Override
    public Boolean checkUsernameExists(UserCredentialsRequestDTO request) {
        return this.userRep.existsByUsernameIgnoreCase(request.getUsername());
    }

    private User getUserIfExiste(UserCredentialsRequestDTO request) throws ResourceNotFoundException {
        User user = this.userRep.findByUsernameAndPasswordHash(request.getUsername(), request.getPasswordHash())
                .orElseThrow(() -> new ResourceNotFoundException("Las credenciales no son válidas."));
        return user;

    }

    private UserRol getUserRolIfExits(Integer id) throws ResourceNotFoundException {
        UserRol rol = this.rolRep.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rol con el Id " + id + " no encontrado."));
        return rol;
    }
}
