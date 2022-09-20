const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a course title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    weeks: {
      type: Number,
      required: [true, "Please add number of weeks"],
    },
    tuition: {
      type: Number,
      required: [true, "Please add a tuition cost"],
    },
    minimumSkill: {
      type: String,
      required: [true, "Please add a minimum skill"],
      enum: ["beginner", "intermediate", "advanced"],
    },
    scholarshipAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: "Bootcamp",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.statics.getAverageCost = async function (bootcampId) {
  try {
    const averageCost = await this.aggregate([
      {
        $match: {
          bootcamp: bootcampId,
        },
      },
      {
        $group: {
          _id: "bootcamp",
          averageCost: { $avg: "$tuition" },
        },
      },
    ]);

    return averageCost[0].averageCost;
  } catch (err) {
    return err;
  }
};

courseSchema.post("save", async function () {
  try {
    const averageCost = await this.model("Course").getAverageCost(
      this.bootcamp
    );

    await this.model("Bootcamp").findByIdAndUpdate(
      this.bootcamp,
      { averageCost: Math.ceil(averageCost) },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
});

courseSchema.post(
  "remove",
  { document: true, query: false },
  async function () {
    try {
      const averageCost = await this.model("Course").getAverageCost(
        this.bootcamp
      );

      await this.model("Bootcamp").findByIdAndUpdate(
        this.bootcamp,
        { averageCost: Math.ceil(averageCost) },
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = mongoose.model("Course", courseSchema);
