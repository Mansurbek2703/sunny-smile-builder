import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

interface VideoTaskProps {
  title: string;
  instruction: string;
  videoUrl: string;
  thumbnail: string;
}

const VideoTask = ({ title, instruction, videoUrl, thumbnail }: VideoTaskProps) => {
  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:v=|\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="space-y-3">
      <h4 className="font-display text-xl font-semibold">{title}</h4>
      <p className="font-body text-base text-muted-foreground">{instruction}</p>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-xl overflow-hidden shadow-lg border aspect-video"
      >
        <iframe
          src={getEmbedUrl(videoUrl)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </motion.div>
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-body"
      >
        <ExternalLink className="w-3 h-3" /> Open in YouTube
      </a>
    </div>
  );
};

export default VideoTask;
