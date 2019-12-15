# final-project-k
final-project-k created by GitHub Classroom

## Features
### Basic
* Member Login & Signup
* Member change profile
* Browse artworks - video or image
* Like an artwork
* Follow a member
* Artwork collection
* Comments
* Simple patatap play section
### Good to have
* Local stored artworks
* Get email notification when someone you follow have new post
* Import artwork from dribble
* Synchronize artwork to dribble account
* Record a patatap and save as video file

## DB Model
### Member
* name: String, require
* email: String, unique, require
* password: String min 6, require
* bio: String
* profile image: url ( better to have : local store )
* artworks: Artwork
* liked: Artwork
* collection: Artwork
* follower: Member
* following: Member
### Artwork
* title: String, require
* description: String
* createdBy: Member
* likedBy: Member
* createdDate: Date
* content: String ( better to have: local store )
* saltSecret: unknown for now