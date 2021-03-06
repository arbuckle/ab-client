import { IContext } from "../../app-context/icontext";
import { ClippedView } from "../clipped-view";

export class ExplosionsRenderer {
    constructor(private context: IContext, private clip: ClippedView) {

    }

    public renderExplosions(context: CanvasRenderingContext2D) {
        context.fillStyle = "rgba(255, 255, 0, 0.7)";
        for (const explosion of this.context.state.getActiveExplosions()) {
            const pos = explosion.pos;
            if (!pos) {
                continue;
            }
            if (this.clip.isVisible(pos)) {
                const clipPos = this.clip.translate(pos);
                context.beginPath();
                context.arc(clipPos.x, clipPos.y, this.clip.scale(explosion.size), 0, 2 * Math.PI);
                context.fill();
            }
        }

        // kills
        context.fillStyle = "rgba(200, 0, 0, 0.7)";
        for (const kill of this.context.state.getActiveKills()) {
            const pos = kill.pos;
            if (!pos) {
                continue;
            }
            if (this.clip.isVisible(pos)) {
                const clipPos = this.clip.translate(pos);
                context.beginPath();
                context.arc(clipPos.x, clipPos.y, this.clip.scale(kill.size), 0, 2 * Math.PI);
                context.fill();
            }
        }

        // missile clouds
        for (const cloud of this.context.state.getActiveRocketTrailClouds()) {
            const pos = cloud.pos;
            if (!pos) {
                continue;
            }
            if (this.clip.isVisible(pos)) {
                const opacity = cloud.opacity;
                if (opacity === 0) {
                    continue;
                }
                context.fillStyle = `rgba(240, 240, 240, ${opacity})`;
                const clipPos = this.clip.translate(pos);
                context.beginPath();
                const cloudSize = this.clip.scale(cloud.size);
                context.arc(clipPos.x, clipPos.y, cloudSize, 0, 2 * Math.PI);
                context.fill();
            }
        }
    }
}
