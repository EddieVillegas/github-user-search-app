import clsx from 'clsx';
import iconLocation from '../../assets/icon-location.svg';
import iconTwitter from '../../assets/icon-twitter.svg';
import iconWeb from '../../assets/icon-website.svg';
import iconCompany from '../../assets/icon-company.svg';
import { useTheme } from '../../hooks/useTheme';
import type { User } from '../../types/User';

Profile.Stats = function ProfileStats({
  public_repos, followers, following
}: {
  public_repos:number, followers: number, following: number
}){
  const {theme} = useTheme()
  const classStatsTitle = clsx({
    "capitalize": true,
    "text-neutral-500": theme === 'ligth',
    "text-neutral": theme === 'dark',
  })
  
  const classStatsQty = clsx({
    "font-bold text-[22px]": true,
    "text-neutral-700": theme === 'ligth', 
    "text-neutral": theme === 'dark',
  })
  return (
    <section 
      id="stats" 
      className={clsx({
        "bg-neutral-100": theme === 'ligth',
        "bg-neutral-900": theme === 'dark',
        "rounded-lg p-6 flex justify-around mb-6 flex-col md:flex-row gap-3": true,
      })}
    >
      <div>
        <p className={classStatsTitle}>Repos</p>
        <p className={classStatsQty}>{public_repos}</p>
      </div>
      <div>
        <p className={classStatsTitle}>Followers</p>
        <p className={classStatsQty}>{followers}</p>
      </div>
      <div>
        <p className={classStatsTitle}>Following</p>
        <p className={classStatsQty}>{following}</p>
      </div>
    </section>
  )
}
  
Profile.Links = function ProfileLinks({
  location, twitter_username, blog, company
}: {
  location: string, twitter_username: string, blog: string, company: string
}){ 
  const {theme} = useTheme()
  const classLinks = clsx({
    "font-bold": true,
    "text-neutral": theme === 'dark',
    "text-neutral-500": theme === 'ligth',
  })

  return(
    <>
      <div className='md:flex'>
        <div className='flex gap-3 mb-4 w-1/2'>
          <img src={iconLocation} alt="location"/>
          <p className={classLinks}>{location}</p>
        </div>
        <div className='flex gap-3 mb-4 w-1/2'>
          <img src={iconTwitter} alt="Twitter"/>
          <p className={classLinks}>{twitter_username || 'Not available'}</p>
        </div>
      </div>

      <div className='md:flex mb-20'>
        <div className='flex gap-3 mb-4 w-1/2'>
          <img src={iconWeb} alt="web"/>
          <p className={classLinks}>{blog}</p>
        </div>
        <div className='flex gap-3 mb-4 w-1/2'>
          <img src={iconCompany} alt="company"/>
          <p className={classLinks}>{company}</p>
        </div>
      </div>
    
    </>
  )
}

Profile.Header = function ProfileHeader({
  created_at, name, login
}: {
  created_at: string, name: string, login: string
}){
  const date = new Date(created_at || '');
  const months = [
    "jan",
    "feb",
    "march",
    "abril",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dic"
  ]
  const joined = `joined ${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`
  
  const {theme} = useTheme()

  const classNameName = clsx({
    "font-bold": true,
    "text-neutral-700": theme == "ligth",
    "text-neutral": theme == "dark"
  })

  const classNameLogin = clsx({
    "text-blue-500": theme === 'ligth',
    "text-blue-300": theme === 'dark',
  })

  const classNameJoined = clsx({
    "text-neutral": theme === "dark",
    "text-neutral-500": theme === "ligth",
  })

  return(
    <section className='inline-block mb-6'>
        <p className={classNameName}>{name}</p>
        <p className={classNameLogin}>@{login}</p>
        <p className={classNameJoined}>{joined}</p>
    </section>
  )
}

Profile.Picture = function ProfilePicture({picture}: {picture: string}) {
  return (
    <figure className='inline-block'>
      <img
        alt="img" 
        src={picture} 
        className='rounded-full w-[70px] h-[70px] md:w-[117] md:h-[117] md:mr-8 mr-5'
      />
    </figure>
  )
}

export default function Profile({
  data
}: {
  data: User
}){
  const { theme } = useTheme()
  return(
    <>
      <Profile.Picture
        picture={data?.avatar_url}
      />

      <Profile.Header
        name={data?.name}
        login={data?.login}
        created_at={data?.created_at}
      />

      <p className={clsx({
        "mb-6": true,
        "text-neutral": theme === 'dark',
        "text-neutral-500": theme === 'ligth'
      })}>
        {data?.bio || 'This profile has no bio'}
      </p>

      <Profile.Stats 
        followers={data?.followers} 
        following={data?.following} 
        public_repos={data?.public_repos}
      />

      <Profile.Links
        blog={data?.blog}
        company={data?.company}
        location={data?.location}
        twitter_username={data?.twitter_username}
      />
    </>
  )
}