import serverAuth from "@/app/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prismadb";

export async function PATCH(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const body = await request.json(); // parse the request body as JSON
  
  // // check the text property in the request body
  // if (!body.text) {
  //     return new Response('Missing text property in request body', {
  //         status: 400,
  //     });
  // }

  // // find the comment with the given ID
  // const comment = comments.find((comment) => comment.id === parseInt(params.id));

  // // check if the comment exists
  // if (!comment) {
  //     return new Response('Comment not found', {
  //         status: 404,
  //     });
  // }

  // // update the comment text
  // comment.text = body.text;

  // return Response.json(comment);

  try {
    const { currentUser } = await serverAuth(req);

    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error('Missing required fields');
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updateUser);
    
  }
  catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}