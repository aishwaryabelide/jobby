import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {MdBusinessCenter} from 'react-icons/md'
import './index.css'

const JobItemDetails1 = props => {
  const {jobDetailsItemList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetailsItemList
  return (
    <Link to={`/jobs/${id}`} className="item-link">
      <li className="job-item-container">
        <div className="header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <p className="job-title">{title}</p>
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
      </li>
    </Link>
  )
}

export default JobItemDetails1
