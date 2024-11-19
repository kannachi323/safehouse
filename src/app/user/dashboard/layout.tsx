
import UserManagerContainer from "@/containers/user-page/UserManagerContainer";


interface Props {
    children : React.ReactNode
    PropertiesForRent : React.ReactNode
    ListingAccuracy : React.ReactNode
    UserEngagement : React.ReactNode
    ListingStatus : React.ReactNode
    TrendTotalViews : React.ReactNode
}

export default function DashboardLayout({PropertiesForRent, ListingAccuracy, UserEngagement, ListingStatus, TrendTotalViews} : Props) {
    return (
       
        <UserManagerContainer node="dashboard">
            
            <div className="grid grid-cols-9 grid-rows-4 gap-10 w-4/5 h-full p-5">

              
  
              {PropertiesForRent}

              {ListingAccuracy}

              {UserEngagement}

              {ListingStatus}

              {TrendTotalViews}

            </div>
        </UserManagerContainer>
        

    );
}