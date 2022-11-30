package pl.edu.pw.backend.ride;

import org.springframework.data.jpa.repository.JpaRepository;

interface RideRepository extends JpaRepository<Ride, Integer> {
}

