package pl.edu.pw.backend.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Data;
import pl.edu.pw.backend.point.Point;

@Data
@AllArgsConstructor
class InfrastructureDTO {

    private String name;
    private Point location;
    private InfrastructureType type;

    public Infrastructure toInfrastructure() {
        return new Infrastructure(name, location, type);
    }

    public static InfrastructureDTO fromInfrastructure(Infrastructure infrastructure) {
        return new InfrastructureDTO(infrastructure.getName(), infrastructure.getLocation(),
            infrastructure.getType());
    }
}
