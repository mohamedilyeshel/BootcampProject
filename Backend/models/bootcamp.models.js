const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder.utils");
const ErrorHandler = require("../utils/errorHandClass.utils");

const bootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Bootcamp should have a name"],
      unique: true,
      trim: true,
      maxlength: [
        50,
        "Bootcamp name is too long, should not pass 50 characters",
      ],
    },
    slug: {
      type: String,
      unique: true,
      maxlength: 512,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        // index : A 2dsphere index supports queries that calculate geometries
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      type: [String],
      required: true,
      enum: {
        values: [
          "Web Development",
          "Mobile Development",
          "UI/UX",
          "Data Science",
          "Business",
          "Other",
        ],
        message: "The career is not acceptable",
      },
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bootcampSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    strict: true,
    lower: true,
  });
  next();
});

bootcampSchema.pre("save", async function (next) {
  try {
    const location = await geocoder.geocode(this.address);
    this.location = {
      type: "Point",
      coordinates: [location[0].longitude, location[0].latitude],
      formattedAddress: location[0].formattedAddress,
      street: location[0].streetName,
      city: location[0].city,
      state: location[0].stateCode,
      zipcode: location[0].zipcode,
      country: location[0].countryCode,
    };

    this.address = undefined;
  } catch (err) {
    next(new ErrorHandler("There's a problem with the location/address"));
  }
});

module.exports = mongoose.model("Bootcamp", bootcampSchema);
