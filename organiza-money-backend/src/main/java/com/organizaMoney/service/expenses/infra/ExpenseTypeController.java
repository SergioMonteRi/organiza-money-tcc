package com.organizaMoney.service.expenses.infra;

import com.organizaMoney.service.expenses.application.ExpenseTypeDTO;
import com.organizaMoney.service.expenses.application.ExpenseTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/expenseType")
public class ExpenseTypeController {
    private final ExpenseTypeService expenseTypeService;

    public ExpenseTypeController(ExpenseTypeService expenseTypeService){
        this.expenseTypeService = expenseTypeService;
    }

    @PostMapping("")
    public ResponseEntity<ExpenseTypeDTO> save(@Valid @RequestBody ExpenseTypeDTO expenseTypeDTO){
        return ResponseEntity.ok().body(this.expenseTypeService.save(expenseTypeDTO));
    }

    @GetMapping("")
    public ResponseEntity<Set<ExpenseTypeDTO>> index(){
        return ResponseEntity.ok().body(this.expenseTypeService.index());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseTypeDTO> update(@PathVariable("id") Long id, @RequestBody ExpenseTypeDTO expenseTypeDTO){
        return ResponseEntity.ok().body(this.expenseTypeService.update(expenseTypeDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id){
        this.expenseTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
