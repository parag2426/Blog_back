import { format } from "timeago.js"

const Comment = ({comment}) => {
  return (
    <div className=" p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex item-center gap-4">
          
        {/* comment.user.img && <img src="{comment.user.img}" alt="" /> */}



        {comment.user.img && <img src={comment.user.img} className="w-10 h-10 rounded-full object-cover" alt="" />  }  
        <span className="font-medium">{comment.user.username}</span>   {/*  commet.user.img */}
        <span className="text-sm">{format(comment.createdAt)}</span>
      </div>
      <div className="">
         <p>
            {comment.desc}
         </p>
      </div>
    </div>
  )
}

export default Comment
