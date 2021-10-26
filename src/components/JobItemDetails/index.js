import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {MdBusinessCenter} from 'react-icons/md'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class JobItemDetails extends Component {
  state = {jobData: {}, isLoading: true, SoftwareSkills: {}}

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()

    const updatedData = {
      companyLogoUrl: data.job_details.company_log_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      skills: data.job_details.skills,
      lifeAtCompany: data.job_details.life_at_company,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      similarJobs: data.similar_jobs,
    }
    this.setState({jobData: updatedData, isLoading: false})

    const skillsData = updatedData.skills.map(each => ({
      skillImageUrl: each.image_url,
      skillName: each.name,
    }))

    this.setState({SoftwareSkills: skillsData, isLoading: false})
  }

  renderJobItemDetails = () => {
    const {jobData, SoftwareSkills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      similarJobs,
    } = jobData

    const lifeAtCompanyDetails = {
      description: lifeAtCompany.description,
      companyImageUrl: lifeAtCompany.image_url,
    }

    return (
      <div className="Jobs-item-details-container">
        <Header />
        <li className="job-item-container-card">
          <div className="header">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div>
              <p className="job-title">{rating}</p>
              <BsFillStarFill className="star-fill" />
              {rating}
            </div>
          </div>
          <div className="flex-row">
            <div className="location-container">
              <GoLocation className="location-logo" />
              <p className="location">{location}</p>
              <MdBusinessCenter className="location-logo" />
              <p className="location">{employmentType}</p>
            </div>

            <p className="job-heading">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <p className="job-heading">Description</p>
          <p className="job-description">{jobDescription}</p>
          <h1 className="job-heading">Skills</h1>
          <div className="skill-container">{this.renderSkills}</div>
        </li>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderJobItemDetails()
        )}
      </div>
    )
  }
}

export default JobItemDetails
