package springboot.backend.fitness.model;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.io.Serializable;

@Entity
@Table(name = "members")
public class Member implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String address;
    private String imageUrl;

    @Column(nullable = false)
    private LocalDate dateJoined;

    @Column(nullable = false)
    private String membershipType; // e.g., "Monthly", "Annual"

    private boolean active; // Active membership status

    public Member() {}

    public Member(String name, String email,String imageUrl, String phone, String address, LocalDate dateJoined, String membershipType, boolean active) {
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.phone = phone;
        this.address = address;
        this.dateJoined = dateJoined;
        this.membershipType = membershipType;
        this.active = active;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(LocalDate dateJoined) {
        this.dateJoined = dateJoined;
    }

    public String getMembershipType() {
        return membershipType;
    }

    public void setMembershipType(String membershipType) {
        this.membershipType = membershipType;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}
