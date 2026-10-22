import { z } from 'zod'

export const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  quantity: z.number().int().min(1).max(20),
})

export const orderSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(9, 'Please enter a valid phone number')
    .regex(/^[0-9+\s-]+$/, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your delivery address'),
  county: z.string().min(2, 'Please select your county'),
  notes: z.string().max(500).optional().default(''),
  paymentMethod: z.enum(['mpesa', 'card']),
  items: z.array(orderItemSchema).min(1, 'Your cart is empty'),
  captchaToken: z.string().optional(),
})

export const sellerApplicationSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  craftType: z.string().min(2, 'Please select your craft'),
  county: z.string().min(2, 'Please select your county'),
  phone: z
    .string()
    .min(9, 'Please enter a valid phone number')
    .regex(/^[0-9+\s-]+$/, 'Please enter a valid phone number'),
  bio: z.string().min(30, 'Tell us a little more, at least 30 characters').max(1200),
  sampleProduct: z.string().min(20, 'Describe a sample product in at least 20 characters').max(1200),
  captchaToken: z.string().optional(),
})

export const reviewSchema = z.object({
  productSlug: z.string().min(1),
  name: z.string().min(2, 'Please enter your name'),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10, 'Please write at least 10 characters').max(1000),
  captchaToken: z.string().optional(),
})

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  captchaToken: z.string().optional(),
})

export const enquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().default(''),
  message: z.string().min(10, 'Please write at least 10 characters').max(2000),
  captchaToken: z.string().optional(),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Use at least 8 characters'),
  captchaToken: z.string().optional(),
})
