"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clinic_1 = require("../controllers/Clinic");
const Clinic_2 = require("../validators/Clinic");
const Clinic = (0, express_1.Router)();
Clinic.route("/") // http://localhost:5000//api/clinic/
    .get(Clinic_1.getClincData)
    .patch(Clinic_2.updateClincDataValidator, Clinic_1.updateClincData);
Clinic.route("/therapist") // http://localhost:5000//api/clinic/therapist
    .get(Clinic_1.getTherapistAvailability)
    .patch(Clinic_2.toggleTherapistAvailabilityValidator, Clinic_1.toggleTherapistAvailability);
exports.default = Clinic;
