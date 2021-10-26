import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItemDetails1 from '../JobItemDetails1'
import './index.css'

class Jobs extends Component {
  state = {
    profileDetails: [],
    jobDetails: [],
    profileSuccess: false,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getJobDetails = async () => {
    const jobUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    const jobDetailsList = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobDetails: jobDetailsList})
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }

      this.setState({profileDetails: updatedData, profileSuccess: true})
    } else {
      this.setState({profileSuccess: false})
    }
    this.getJobDetails()
  }

  onSearchJobs = event => {
    event.preventDefault()
  }

  render() {
    const {profileDetails, profileSuccess, jobDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    console.log(jobDetails)
    return (
      <div>
        <Header />
        <div className="jobs-route-container">
          <div className="profile-container">
            {profileSuccess ? (
              <div className="profile-card">
                <img
                  className="profile-pic"
                  src={profileImageUrl}
                  alt="profile pic"
                />
                <p className="name">{name}</p>
                <p className="short-bio">{shortBio}</p>
              </div>
            ) : (
              <div className="profile-failure">
                <button type="button" className="retry-button">
                  Retry
                </button>
              </div>
            )}
            <hr className="line" />

            <div className="employment-container">
              <p className="employment-type-heading">Type of Employment</p>
              <div>
                <input type="checkbox" id="fulltime" className="checkbox" />
                <label htmlFor="fulltime" className="employment-label">
                  Full Time
                </label>
              </div>

              <div>
                <input type="checkbox" id="partTime" className="checkbox" />
                <label htmlFor="partTime" className="employment-label">
                  Part Time
                </label>
              </div>

              <div>
                <input type="checkbox" id="freelance" className="checkbox" />
                <label htmlFor="freelance" className="employment-label">
                  Freelance
                </label>
              </div>

              <div>
                <input type="checkbox" id="internship" className="checkbox" />
                <label htmlFor="internship" className="employment-label">
                  Internship
                </label>
              </div>
            </div>
            <hr className="line" />

            <div className="employment-container">
              <p className="employment-type-heading">Salary Range</p>
              <div>
                <input
                  type="radio"
                  id="tenAndAbove"
                  className="checkbox"
                  name="package"
                />
                <label htmlFor="tenAndAbove" className="employment-label">
                  10 LPA and above
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="twentyAndAbove"
                  className="checkbox"
                  name="package"
                />
                <label htmlFor="twentyAndAbove" className="employment-label">
                  20 LPA and above
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="thirtyAndAbove"
                  className="checkbox"
                  name="package"
                />
                <label htmlFor="thirtyAndAbove" className="employment-label">
                  30 LPA and above
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="fortyAndAbove"
                  className="checkbox"
                  name="package"
                />
                <label htmlFor="fortyAndAbove" className="employment-label">
                  40 LPA and above
                </label>
              </div>
            </div>
          </div>

          <div className="job-items-container">
            <form
              className="search-bar-container"
              type="submit"
              onSubmit={this.onSearchJobs}
            >
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
              />
              <button type="submit" className="search-button">
                <BsSearch
                  className="job-search-icon"
                  onClick={this.onSearchJobs}
                />
              </button>
            </form>

            <ul className="job-items-container">
              {jobDetails.map(eachJob => (
                <JobItemDetails1
                  jobDetailsItemList={eachJob}
                  key={eachJob.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
