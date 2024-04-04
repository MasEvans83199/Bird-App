import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Collapse,
  Avatar,
  IconButton,
  Input,
  Textarea,
  Typography,
 } from "@material-tailwind/react";
import {
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import defaultAvatar from "../assets/default_icon.png";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ycfcamxsouvagmrltkbj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmNhbXhzb3V2YWdtcmx0a2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzkwMDY5NiwiZXhwIjoxOTk5NDc2Njk2fQ.HnRHsN9-nfvLXrxcMou7L4kerT6TAz77YCOMl6jZz8c'
)

function Posts({ session }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const tempUsernamesRef = useRef({});
  const [selectedPost, setSelectedPost] = useState(postId);
  const [mainReply, setMainReply] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [newReplyTo, setNewReplyTo] = useState("");
  const [openReplies, setOpenReplies] = useState({});

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data: posts, error } = await supabase
          .from("forum_posts")
          .select(
            `*,
            user_id (
              id,
              username,
              avatar_url
            )
          `
          )
          .eq("id", postId);

        if (error) {
          throw error;
        }

        if (posts && posts.length > 0) {
          setPost(posts[0]);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchPost();
  }, [postId]);

  useEffect(() => {
    async function fetchReplies(postId, parentReplyId = null) {
      try {
        if (selectedPost) {
          const { data: repliesData, error } = await supabase
            .from("replies")
            .select(
              `
              *,
              profile_id (
                id,
                username,
                avatar_url
              )
            `
            )
            .eq("post_id", selectedPost)
            .order("created_at", { ascending: false });

          if (error) {
            throw error;
          }

          if (repliesData) {
            setReplies(repliesData);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchReplies();
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "replies",
        },
        (payload) => {
          fetchReplies();
        }
      )
      .subscribe();
  }, [session, selectedPost]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const formatDateTime = (timestamp) => {
    const options = {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  const handleReplyChange = (event, postId) => {
    setMainReply(event.target.value);
    setNewReplyTo(event.target.value);
  };

  const handleReplySubmit = async (event, specificReplyId = null) => {
    event.preventDefault();
    try {
      
      if (!mainReply && !replyTo && !specificReplyId) {
        console.error("Please enter a reply for the post.");
        return;
      }

      
      if (!newReplyTo && (replyTo || specificReplyId)) {
        console.error("Please enter a reply to this reply.");
        return;
      }

      const { data: selectedPostData, error: postError } = await supabase
        .from("forum_posts")
        .select(`
          user_id (
            id
          )
        `)
        .eq("id", selectedPost);

      if (postError) {
        console.error("Error getting post data:", postError);
        return;
      }

      const selectedUserId = selectedPostData[0].user_id.id;

      const { data: replyIdData, error: replyIdError } = await supabase.from(
        "replies"
      ).select(`
          id
        `);

      if (replyIdError) {
        console.error("Error with reply:", replyIdError);
        return;
      }

      const replyId = replyIdData[0].id;

      const newReplyObj = {
        reply: specificReplyId ? newReplyTo : mainReply,
        post_id: selectedPost,
        profile_id: session.user.id,
        created_at: new Date().toISOString(),
        parent_reply_id: specificReplyId || replyTo,
      };

      const { error: replyError } = await supabase
        .from("replies")
        .insert([newReplyObj]);

      if (selectedUserId !== session.user.id) {
        const notifObj = {
          user_id: selectedUserId,
          post_id: selectedPost,
          created_at: new Date().toISOString(),
          reply_user_id: session.user.id,
          message: specificReplyId ? newReplyTo : mainReply,
          reply_id: replyId,
        };

        const { error: notifError } = await supabase
          .from("notifications")
          .insert([notifObj]);

        if (replyError || notifError) {
          console.error("Error creating reply:", replyError, notifError);
          return;
        }
      }

      setReplies((prevReplies) => [...prevReplies, newReplyObj]);
      setMainReply("");
      setReplyTo(null);
      setNewReplyTo("");
    } catch (error) {
      console.error(error.message);
      alert("You must be signed in to reply to a post.");
    }
  };



  const handleReplyTo = (replyId) => {
    setReplyTo(null); 
    setNewReplyTo(""); 
    setReplyTo(replyId); 
  };


    const toggleReplyTextarea = (replyId) => {
      setOpenReplies((prevOpenReplies) => ({
        ...prevOpenReplies,
        [replyId]: !prevOpenReplies[replyId],
      }));
    };

  const generateTempUsername = (() => {
    let counter = 0;
    return () => {
      counter += 1;
      return `Unnamed User ${counter}`;
    };
  })();

  const getTempUsername = (userId) => {
    if(tempUsernamesRef.current[userId]) {
      return tempUsernamesRef.current[userId];
    }

    const newTempUsername = `Anonymous User #${Object.keys(tempUsernamesRef.current).length + 1}`;
    tempUsernamesRef.current[userId] = newTempUsername;
    return newTempUsername;
  }

    const renderReplies = (replies, parentReplyId = null, depth = 0, maxDepth = 10) => {
    if (depth > maxDepth) {
      console.error("Maximum recursion depth reached.");
      return null;
    }

    const filteredReplies = replies.filter(reply => reply.parent_reply_id === parentReplyId);

    if (filteredReplies.length === 0) {
      return null;
    }


    return (
      <div>
        {filteredReplies.map((reply) => (
          <div
            key={reply.id}
            className="ml-4 mt-2 border-l"
            style={{ marginLeft: calculateIndentation(reply.level) }}
          >
            <div className="flex items-center">
              <Typography variant="small" color="gray" className="text-left ml-2 dark:text-gray-400">
                <span>
                  {reply.profile_id.username ? reply.profile_id.username : getTempUsername(reply.profile_id.id)}
                </span>
                <span className="ml-2 dark:text-gray-400">
                  {formatDateTime(reply.created_at)}
                </span>
              </Typography>
              <PaperAirplaneIcon
                className="h-4 w-4 ml-2 dark:text-gray-400 cursor-pointer hover:text-light-blue-500"
                onClick={() => toggleReplyTextarea(reply.id)}
              />
            </div>
            <Typography variant="paragraph" className="text-left mb-2 ml-2 dark:text-gray-300">
              {reply.reply}
            </Typography>
            <Collapse open={openReplies[reply.id]}>
              <form onSubmit={(e) => handleReplySubmit(e, reply.id)}>
                <Textarea
                  size="md"
                  className="bg-slate-300"
                  color="light-blue"
                  value={newReplyTo}
                  onChange={(e) => setNewReplyTo(e.target.value)}
                  label={`Reply to ${reply.profile_id.username}'s post...`}
                />
                <div className="grid place-items-center">
                  <Button color="light-blue" type="submit" className="dark:bg-[#2563eb]">
                    Reply
                  </Button>
                </div>
              </form>
            </Collapse>
            {renderReplies(replies, reply.id, depth + 1, maxDepth)}
          </div>
        ))}
      </div>
    );
  };
  
  const calculateIndentation = (level) => {
    const baseIndentation = 2; 
    return `${baseIndentation + level * 2}rem`;
  };

  return (
    <div className="grid place-items-center">
      <Card className="mt-12 sm:w-full lg:w-1/2 md:w-full dark:bg-blue-gray-700">
        <CardHeader className="dark:bg-blue-gray-600">
          <div className="flex items-center ml-4 my-2">
            <div className="flex items-center mr-4">
              {post.user_id.avatar_url ? (
                <Avatar className="mr-2" size="sm" src={post.user_id.avatar_url} />
              ) : (
                <Avatar className="mr-2" size="sm" src={defaultAvatar} />
              )}
              {post.user_id.username ? (
                <Typography  className="dark:text-gray-300" variant="small" color="black">
                  {post.user_id.username}
                </Typography>
              ) : (
                <Typography  className="dark:text-gray-300" variant="small" color="black">
                  {generateTempUsername()}
                </Typography>
              )}
            </div>
            <div className="flex-1 text-right mr-2">
              <Typography  className="dark:text-gray-400" variant="small">
                {formatDateTime(post.created_at)}
              </Typography>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <div className="flex-grow flex items-center justify-center">
            <Typography variant="h4" color="black" className="text-center dark:text-white">
              {post.text}
            </Typography>
          </div>
        </CardBody>
        <CardBody>
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Uploaded by"
              className="rounded-xl min-w-[200px] border-2 border-gray-500 shadow-lg shadow-blue-gray-900/5"
            />
          )}
          <Typography
            variant="paragraph"
            className="mt-4 text-left dark:text-gray-300"
          >
            {post.details}
          </Typography>
        </CardBody>
        <CardBody>
          <form onSubmit={handleReplySubmit}>
            <Textarea
              size="md"
              className="bg-slate-300"
              color="light-blue"
              value={mainReply}
              onChange={(e) => handleReplyChange(e)}
              label="Reply to this post..."
            />
            <div className="grid place-items-center">
              <Button color="light-blue" className="dark:bg-[#2563eb]" type="submit">
                Reply
              </Button>
            </div>
          </form>
        </CardBody>
        <CardBody className="grid place-items-start border-t">
          {replies.length > 0 ? (
            <div>
              <Typography className="dark:text-gray-300" variant="h5">Replies:</Typography>
              {renderReplies(replies)}
            </div>
          ) : (
            <div>
              <Typography className="dark:text-gray-300" variant="h5">Replies:</Typography>
              <Typography
                variant="small"
                className="text-left mb-2 mt-6 ml-4 dark:text-gray-400"
              >
                No replies yet.
              </Typography>
            </div>
          )}
        </CardBody>
        <CardFooter className="border-t">
          <Link to="/thread">
            <Button color="deep-orange">Back to Forum</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Posts;