"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Volume2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface YouTubeVideo {
  youtubeId: string
  title: string
  description: string
  duration: string
  tags: string[]
}

interface YouTubeVideosSectionProps {
  videos: YouTubeVideo[]
  subcultureName: string
}

export function YouTubeVideosSection({ videos, subcultureName }: YouTubeVideosSectionProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(videos[0]?.youtubeId || null)
  const [isPlaying, setIsPlaying] = useState(false)

  const selectedVideo = videos.find((v) => v.youtubeId === selectedVideoId)

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
  }

  const getYouTubeThumbnailUrl = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  return (
    <div className="w-full space-y-8">
      {/* Main Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={getYouTubeEmbedUrl(selectedVideoId || videos[0]?.youtubeId)}
              title={selectedVideo?.title || "YouTube Video"}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Video Info */}
        {selectedVideo && (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedVideo.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedVideo.description}</p>
              </div>
              <Badge variant="secondary" className="whitespace-nowrap">
                {selectedVideo.duration}
              </Badge>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedVideo.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => {
                  const url = `https://www.youtube.com/watch?v=${selectedVideoId}`
                  window.open(url, "_blank")
                }}
              >
                <Play className="w-4 h-4" />
                Watch on YouTube
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => {
                  const text = `Check out "${selectedVideo.title}" about ${subcultureName} culture`
                  navigator.clipboard.writeText(`${text}\nhttps://www.youtube.com/watch?v=${selectedVideoId}`)
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Video Playlist */}
      {videos.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold text-foreground">More Videos from {subcultureName}</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <motion.button
                key={video.youtubeId}
                onClick={() => {
                  setSelectedVideoId(video.youtubeId)
                  setIsPlaying(true)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden rounded-xl transition-all ${
                  selectedVideoId === video.youtubeId ? "ring-2 ring-primary shadow-lg" : "hover:shadow-lg"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={getYouTubeThumbnailUrl(video.youtubeId) || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0">{video.duration}</Badge>
                </div>

                {/* Video Title */}
                <div className="p-3 bg-card/50 backdrop-blur-sm border-t border-border">
                  <p className="text-sm font-medium text-foreground text-left line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Accessibility Info */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <div className="flex gap-3">
          <Volume2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Accessibility</p>
            <p>
              Videos are embedded from YouTube. Use keyboard shortcuts (spacebar to play/pause, arrow keys to navigate)
              for better accessibility. Captions may be available in the video player settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
