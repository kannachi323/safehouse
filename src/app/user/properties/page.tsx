import UserManagerContainer from "@/containers/user-page/UserManagerContainer"
import CreateListingContainer from "@/containers/user-page/CreateListingContainer"

export default function Dashbard() {
    return (
        <UserManagerContainer node='my-properties'>
            <div id="content" className="w-4/5 h-full flex flex-col items-start justify-start overflow-y-auto">
                <CreateListingContainer />
                
            
            
            
            </div>

        </UserManagerContainer>
        

    )
}