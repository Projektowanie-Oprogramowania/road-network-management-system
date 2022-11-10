package pl.edu.pw.backend.roads;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pw.backend.region.Region;

import java.util.List;

@Repository
public interface RoadRepository extends CrudRepository<Road, Integer> {
    List<Road> findByRegion(Region region);
}
