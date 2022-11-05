package pl.edu.pw.backend.infrastructure;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
class InfrastructureService {
    //store id and use DB entities

    private final static Long RANDOM_ID = 1234L;

    @Autowired
    private InfrastructureRepository infrastructureRepository;

    Infrastructure addInfrastructureObject(Infrastructure infrastructure) {
        return infrastructureRepository.save(infrastructure);
    }

    Infrastructure updateInfrastructureObject(Infrastructure infrastructure) {
        return infrastructureRepository.findById(RANDOM_ID).orElseThrow();
    }

    void removeInfrastructureObject(Long id) {
        infrastructureRepository.deleteById(id);
    }

    List<Infrastructure> getInfrastructure() {
        return infrastructureRepository.findAll();
    }
}
