package pl.edu.pw.backend.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Data;
import pl.edu.pw.backend.point.Point;

@Data
@AllArgsConstructor
class InfrastructureDTO {

    private String name;
    private Point location;
    private InfrastructureType infrastructureType;

    public Infrastructure toInfrastructure() {
        return new Infrastructure(name, location, infrastructureType);
    }

    public static InfrastructureDTO fromInfrastructure(Infrastructure infrastructure) {
        return new InfrastructureDTO(infrastructure.getName(), infrastructure.getLocation(),
            infrastructure.getInfrastructureType());
    }
}
