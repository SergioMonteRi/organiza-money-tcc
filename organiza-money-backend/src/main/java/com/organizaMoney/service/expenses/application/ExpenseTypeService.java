package com.organizaMoney.service.expenses.application;

import com.organizaMoney.service.expenses.domain.ExpenseType;
import com.organizaMoney.service.expenses.infra.ExpenseTypeRepository;
import com.organizaMoney.service.user.application.UserServices;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ExpenseTypeService {
    private final ExpenseTypeRepository expenseTypeRepository;
    private final UserServices userServices;
    public ExpenseTypeService(ExpenseTypeRepository expenseTypeRepository,
                              UserServices userServices) {
        this.expenseTypeRepository = expenseTypeRepository;
        this.userServices = userServices;
    }
    @Transactional
    public ExpenseTypeDTO save(ExpenseTypeDTO expenseTypeDTO){
        ExpenseType expenseType = new ExpenseType();
        expenseType.setUser(userServices.getLoggedUser());
        expenseType.setName(expenseTypeDTO.getName());
        return new ExpenseTypeDTO(expenseTypeRepository.save(expenseType));
    }
    @Transactional(readOnly = true)
    public Set<ExpenseTypeDTO> index(){
        return this.expenseTypeRepository.findAllByUser(userServices.getLoggedUser()).stream().map(ExpenseTypeDTO::new).collect(Collectors.toSet());
    }
    @Transactional
    public ExpenseTypeDTO update(ExpenseTypeDTO expenseTypeDTO, Long id){
        ExpenseType expenseType = this.expenseTypeRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Tipo de gasto não encontrado"));
        expenseType.setName(expenseTypeDTO.getName());
        return new ExpenseTypeDTO(this.expenseTypeRepository.save(expenseType));
    }

    @Transactional
    public void delete(Long id){
        if(this.expenseTypeRepository.findById(id).isPresent()){
            this.expenseTypeRepository.deleteById(id);
        }
    }
}
