package pl.edu.pw.backend.infrastructure;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
class InfrastructureService {

    @Autowired
    private InfrastructureRepository infrastructureRepository;

    Infrastructure addInfrastructureObject(Infrastructure infrastructure) {
        return infrastructureRepository.save(infrastructure);
    }

    Infrastructure updateInfrastructureObject(Infrastructure infrastructure) {
        Infrastructure infr = infrastructureRepository.findById(infrastructure.getId())
            .orElseThrow();
        infr.setInfrastructureType(infrastructure.getInfrastructureType());
        infr.setLocation(infrastructure.getLocation());
        infr.setInfrastructureType(infrastructure.getInfrastructureType());
        return infrastructureRepository.save(infr);
    }

    void removeInfrastructureObject(Long id) {
        infrastructureRepository.deleteById(id);
    }

    List<Infrastructure> getInfrastructure() {
        return infrastructureRepository.findAll();
    }

    List<List<Infrastructure>> getInfrastructureListByType() {
        List<Infrastructure> infraList = infrastructureRepository.findAll();
        List<List<Infrastructure>> infraListByType = new ArrayList<>();
        for (InfrastructureType type : InfrastructureType.values()) {
            List<Infrastructure> typedInfraList = new ArrayList<>();
            for (Infrastructure infra : infraList) {
                if (infra.getInfrastructureType() == type) {
                    typedInfraList.add(infra);
                }
            }
            infraListByType.add(typedInfraList);
        }
        return infraListByType;
    }
}
