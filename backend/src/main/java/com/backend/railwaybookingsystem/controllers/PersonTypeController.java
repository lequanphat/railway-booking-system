package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.person_types.responses.PersonTypesResponse;
import com.backend.railwaybookingsystem.services.PersonTypeService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class PersonTypeController {
    @Autowired
    private PersonTypeService personTypeService;
    @GetMapping("public/person-types")
    @Operation(tags = "Person Types", description = "get all person types")
    public ResponseEntity<List<PersonTypesResponse>> getAllPersonTypes() {
        List<PersonTypesResponse> personTypes = personTypeService.getAllPersonTypes();
        return ResponseEntity.ok(personTypes);
    }

}
