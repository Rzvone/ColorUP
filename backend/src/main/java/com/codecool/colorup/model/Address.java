package com.codecool.colorup.model;

import com.codecool.colorup.enums.AddressType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @Column(name="address1")
    private String address1;

    @Column(name="address2")
    private String address2;

    @NotNull
    @Column(name="city")
    private String city;

    @Column(name = "province")
    private String province;

    @NotNull
    @Column(name="zipcode")
    private String zipcode;

    @NotNull
    @Column(name="country")
    private String country;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name="type")
    private AddressType addressType;
}
