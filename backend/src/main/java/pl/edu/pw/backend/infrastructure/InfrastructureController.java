package pl.edu.pw.backend.infrastructure;

import static org.springframework.http.HttpStatus.CREATED;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/infrastructure")
public class InfrastructureController {

    private final InfrastructureService infrastructureService;

    @PostMapping
    public ResponseEntity<InfrastructureDTO> addInfrastructureObject(
        @RequestBody InfrastructureDTO infrastructureDTO) {

        Infrastructure addedInfrastructure = infrastructureService.addInfrastructureObject(
            infrastructureDTO.toInfrastructure());

        return ResponseEntity.status(CREATED)
            .body(InfrastructureDTO.fromInfrastructure(addedInfrastructure));

    }

    @PutMapping
    public ResponseEntity<InfrastructureDTO> updateInfrastructureObject(
        @RequestBody UpdateInfrastructureDTO infrastructureDTO) {
        Infrastructure updatedInfrastructure = infrastructureService.updateInfrastructureObject(
            infrastructureDTO.toInfrastructure());
        return ResponseEntity.ok(InfrastructureDTO.fromInfrastructure(updatedInfrastructure));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeInfrastructureObject(@PathVariable Long id) {
        infrastructureService.removeInfrastructureObject(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<InfrastructureDTO>> getInfrastructure() {
        List<InfrastructureDTO> infraList = infrastructureService.getInfrastructure().stream().map(
            InfrastructureDTO::fromInfrastructure).collect(Collectors.toList());
        return ResponseEntity.ok(infraList);
    }

    @GetMapping("/types")
    public ResponseEntity<List<List<InfrastructureDTO>>> getInfrastructureByType() {
        List<List<InfrastructureDTO>> infraList = infrastructureService.getInfrastructureListByType()
            .stream().map(list -> list.stream().map(
                InfrastructureDTO::fromInfrastructure).collect(Collectors.toList()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(infraList);
    }
}
