package com.organizaMoney.service.expenses.infra;

import com.organizaMoney.service.expenses.application.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/expense")
public class ExpenseController {
    private final ExpenseService expenseService;
    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }
    @PostMapping
    public ResponseEntity<ExpenseDTO> save(@Valid @RequestBody ExpenseDTO expenseDTO){
        return ResponseEntity.ok().body(expenseService.save(expenseDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id){
        this.expenseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDTO> update(@PathVariable("id") Long id, @Valid @RequestBody ExpenseDTO expenseDTO){
        return ResponseEntity.ok().body(this.expenseService.update(id, expenseDTO));
    }

    @GetMapping()
    public ResponseEntity<Page<TableDataDTO>> index(
            @RequestParam(value = "startDate", defaultValue = "")String startDate,
            @RequestParam(value = "endDate",  defaultValue = "") String endDate,
            @RequestParam(value = "expenseType", required = false) Long expenseTypeId,
            Pageable pageable){
        return ResponseEntity.ok().body(expenseService.index(startDate, endDate, expenseTypeId, pageable));
    }
    @GetMapping("/filter")
    public ResponseEntity<List<FilterDTO>>filter(
            @RequestParam(value = "startDate", defaultValue = "")String startDate,
            @RequestParam(value = "endDate",  defaultValue = "") String endDate,
            @RequestParam(value = "expenseType", required = false) Long expenseTypeId){
        return ResponseEntity.ok().body(expenseService.filter(startDate, endDate, expenseTypeId));
    }

    @GetMapping("/summary")
    public ResponseEntity<List<SummaryDTO>> summary(
            @RequestParam(value = "startDate", defaultValue = "")String startDate,
            @RequestParam(value = "endDate",  defaultValue = "") String endDate,
            @RequestParam(value = "expenseType", required = false) Long expenseTypeId
    ){
        return ResponseEntity.ok().body(expenseService.summary(startDate, endDate, expenseTypeId));
    }

    @GetMapping("/expense-type")
    public ResponseEntity<List<SpendTypeDTO>> spendType(
            @RequestParam(value = "startDate", defaultValue = "")String startDate,
            @RequestParam(value = "endDate",  defaultValue = "") String endDate
    ){
        return ResponseEntity.ok().body(expenseService.spendType(startDate, endDate));
    }
}
