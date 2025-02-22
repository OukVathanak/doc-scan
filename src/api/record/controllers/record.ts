/**
 * record controller
 */

import { factories } from "@strapi/strapi";
import { TesseractHelper } from "../../../utils/tessaract-helper";
import axios from "axios";

export default factories.createCoreController(
  "api::record.record",
  ({ strapi }) => {
    return {
      async scanFile(ctx: any) {
        try {
          // const imageUrl = ctx.request.body.imageUrl;

          const response = {
            sender: "Sender",
            receiver: "receiver",
            title: "title",
            description: "desc",
            date: new Date(),
            category: "category",
          };

          // Fetch sender name
          const sender = await strapi
            .documents("api::member.member")
            .findFirst({
              filters: {
                name: { $eq: response.sender },
              },
            });

          // Check if sender doesn't exist create new one
          if (!sender) {
            await strapi.documents("api::member.member").create({
              data: {
                name: response.sender,
                role: "user",
              },
            });
          }

          // Fetch receiver
          const receiver = await strapi
            .documents("api::member.member")
            .findFirst({
              filters: {
                name: { $eq: response.receiver },
              },
            });

          // Check if receiver doesn't exist create new one
          if (!receiver) {
            await strapi.documents("api::member.member").create({
              data: {
                name: response.receiver,
                role: "user",
              },
            });
          }

          // Fetch category
          const category = await strapi
            .documents("api::category.category")
            .findFirst({
              filters: {
                slug: { $eq: response.category },
              },
            });

          // Check if receiver doesn't exist create new one
          if (!category) {
            await strapi.documents("api::category.category").create({
              data: {
                name: response.category,
                slug: response.category.toLowerCase().replace(/\s+/g, "-"),
              },
            });
          }

          return "hi";
        } catch (error) {
          throw error;
        }
      },
    };
  }
);
