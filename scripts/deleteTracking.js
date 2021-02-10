function deleteTracking(tracking_id) {
    let curr_tracking = document.getElementById(tracking_id);
    clearGraph(tracking_id.replace("tracking_", ""));
    curr_tracking.remove();
}