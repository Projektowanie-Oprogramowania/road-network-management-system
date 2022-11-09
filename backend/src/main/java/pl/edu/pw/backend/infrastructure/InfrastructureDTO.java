package pl.edu.pw.backend.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.point.PointMapper;

@Data
@AllArgsConstructor
@NoArgsConstructor
class InfrastructureDTO {

    private String name;
    private PointDTO location;
    private InfrastructureType infrastructureType;

    public Infrastructure toInfrastructure() {
        return new Infrastructure(name, PointMapper.map(location), infrastructureType);
    }

    public static InfrastructureDTO fromInfrastructure(Infrastructure infrastructure) {
        return new InfrastructureDTO(infrastructure.getName(), PointMapper.map(infrastructure.getLocation()),
            infrastructure.getInfrastructureType());
    }
}
