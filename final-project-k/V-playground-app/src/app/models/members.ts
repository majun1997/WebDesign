/**
 *
 *
 * @export
 * @interface Member
 */
export interface Member {
  id: string;                       //member ID
  name: string;                     //member Name
  email: string;                    //member Email
  password: string;                 //member Password
  bio: string;                      //member description
  profileImg: string;               //member photo
  location: string;                 //where is the member
  follower:[];                      //(array string), storage of member id
  following:[];                     //(array string), storage of member id
  favorites:Array<string>;          //(array string), storage of artwork id
}
