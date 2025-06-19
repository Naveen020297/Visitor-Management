"use client"

import type React from "react"
import { useState } from "react"
import { Camera, CheckCircle, User, Phone, FileText, Users } from "lucide-react"

export function TabletRegistration() {
  const [step, setStep] = useState<"form" | "photo" | "confirmation">("form")
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    purposeOfVisit: "",
    whomToMeet: "",
  })
  const [photoTaken, setPhotoTaken] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "form") {
      setStep("photo")
    } else if (step === "photo" && photoTaken) {
      setStep("confirmation")
    }
  }

  const handleTakePhoto = () => {
    setPhotoTaken(true)
    setTimeout(() => setStep("confirmation"), 1000)
  }

  const resetForm = () => {
    setStep("form")
    setFormData({ fullName: "", mobileNumber: "", purposeOfVisit: "", whomToMeet: "" })
    setPhotoTaken(false)
  }

  if (step === "confirmation") {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card confirmation-card">
            <div className="card-body text-center py-5">
              <CheckCircle className="confirmation-icon mb-4" />
              <h2 className="confirmation-title mb-3">Thank You!</h2>
              <p className="confirmation-text mb-4">
                Your registration is complete. Please collect your visitor pass from the security desk.
              </p>
              <button onClick={resetForm} className="btn btn-primary btn-lg">
                Register Another Visitor
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "photo") {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2 className="card-title mb-2">Photo Capture</h2>
              <p className="text-muted">Please look at the camera and take your photo</p>
            </div>
            <div className="card-body text-center">
              <div className="photo-capture-area mx-auto mb-4">
                {!photoTaken ? (
                  <div className="photo-placeholder">
                    <Camera className="camera-icon mb-3" />
                    <p className="text-muted">Camera preview will appear here</p>
                  </div>
                ) : (
                  <div className="photo-taken">
                    <div className="photo-preview">
                      <User className="user-icon" />
                    </div>
                    <p className="photo-success mt-2">Photo captured successfully!</p>
                  </div>
                )}
              </div>
              <div className="photo-actions">
                {!photoTaken ? (
                  <button onClick={handleTakePhoto} className="btn btn-primary btn-lg px-4">
                    <Camera className="me-2" />
                    Take Photo
                  </button>
                ) : (
                  <div className="d-flex gap-3 justify-content-center">
                    <button onClick={() => setPhotoTaken(false)} className="btn btn-outline-secondary btn-lg">
                      Retake Photo
                    </button>
                    <button onClick={handleSubmit} className="btn btn-success btn-lg">
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8">
        <div className="card registration-card">
          <div className="card-header text-center">
            <h2 className="card-title mb-2">Visitor Registration</h2>
            <p className="text-muted">Please fill in your details to register your visit</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="form-label field-label">
                  <User className="field-icon me-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="mobileNumber" className="form-label field-label">
                  <Phone className="field-icon me-2" />
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="whomToMeet" className="form-label field-label">
                  <Users className="field-icon me-2" />
                  Whom to Meet *
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="whomToMeet"
                  value={formData.whomToMeet}
                  onChange={(e) => setFormData({ ...formData, whomToMeet: e.target.value })}
                  placeholder="Name of person you're visiting"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="purposeOfVisit" className="form-label field-label">
                  <FileText className="field-icon me-2" />
                  Purpose of Visit *
                </label>
                <textarea
                  className="form-control form-control-lg"
                  id="purposeOfVisit"
                  rows={3}
                  value={formData.purposeOfVisit}
                  onChange={(e) => setFormData({ ...formData, purposeOfVisit: e.target.value })}
                  placeholder="Brief description of your visit purpose"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Continue to Photo Capture
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
