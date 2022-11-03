package pl.edu.pw.backend.region;

public class RegionMapper {
    private RegionMapper() {}

    public static RegionDTO map(Region region) {
        return new RegionDTO(region.getId(), region.getName());
    }

    public static Region map(RegionDTO region) {
        return new Region(region.getId(), region.getName());
    }
}
